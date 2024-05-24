import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConformedValue } from "../../masked-input/NumberMask";
import { setSelectedMember } from "../../store/reducers/familyMembersSlice";
import CurrencyInput from "./components/CurrencyInput";
import DeleteMemberButton from "./components/DeleteMemberButton";
import DiscountSwitch from "./components/DiscountSwitch";
import FamilyDiscount from "./components/FamilyDiscount";
import InputWithLabel from "./components/InputWithLabel";
import JustMarried from "./components/JustMarried";
import OutputBadge from "./components/OutputBadge";
import SalaryButtons from "./components/SalaryButtons";
import SalarySlider from "./components/SalarySlider";

const SalaryCalculator = () => {
  const calculateNetSalary = () => {
    const SZJA = 15;
    const TB = 18.5;
    const personalTaxDeductionMax = 77_300;
    const justMarriedBonus = isJustMarriedEligible ? 5_000 : 0;

    let totalTaxes = 0;

    if (isBelow25) {
      const below25MaxGrossSalary = 499_952;
      const SZJAObligatory = Math.max(0, grossSalary - below25MaxGrossSalary);

      totalTaxes += SZJAObligatory * (SZJA / 100);
    } else totalTaxes += grossSalary * ((SZJA + TB) / 100);

    if (isPersonalTaxDeduction && totalTaxes > personalTaxDeductionMax)
      totalTaxes -= personalTaxDeductionMax;
    else if (isPersonalTaxDeduction) totalTaxes = 0;

    if (totalTaxes > familyDiscountValue) totalTaxes -= familyDiscountValue;
    else totalTaxes = 0;

    const totalNetSalary = grossSalary + justMarriedBonus - totalTaxes;

    return Math.floor(totalNetSalary);
  };

  const { selectedMember } = useSelector((state) => state.familyMembers);
  const dispatch = useDispatch();

  // local states
  const initialGrossSalary = 250_000;
  const [grossSalary, setGrossSalary] = useState(initialGrossSalary);
  const [formattedGrossSalary, setFormattedGrossSalary] = useState(null);
  const [netSalary, setNetSalary] = useState(0);

  // update input value when grossSalary changes
  useEffect(() => {
    const formattedGrossSalary = getConformedValue(grossSalary.toString());

    setFormattedGrossSalary(formattedGrossSalary);
  }, [grossSalary]);

  // discount states
  const [isBelow25, setIsBelow25] = useState(false);
  const [isJustMarriedEligible, setIsJustMarriedEligible] = useState(false);
  const [isPersonalTaxDeduction, setIsPersonalTaxDeduction] = useState(false);
  const [familyDiscountValue, setFamilyDiscountValue] = useState(0);

  // Update values in store when states change
  useEffect(() => {
    const calculatedNetSalary = calculateNetSalary();
    setNetSalary(calculatedNetSalary);

    dispatch(
      setSelectedMember({
        grossSalary: grossSalary,
        netSalary: calculatedNetSalary,
        isBelow25: isBelow25,
        isJustMarriedEligible: isJustMarriedEligible,
        isPersonalTaxDeduction: isPersonalTaxDeduction,
        familyDiscountValue: familyDiscountValue,
      }),
    );
  }, [
    grossSalary,
    isBelow25,
    isJustMarriedEligible,
    isPersonalTaxDeduction,
    familyDiscountValue,
  ]);

  // Set states when selected member id changes
  useEffect(() => {
    setGrossSalary(selectedMember.grossSalary);
    setIsBelow25(selectedMember.isBelow25);
    setIsJustMarriedEligible(selectedMember.isJustMarriedEligible);
    setIsPersonalTaxDeduction(selectedMember.isPersonalTaxDeduction);
    setFamilyDiscountValue(selectedMember.familyDiscountValue);
  }, [selectedMember.id]);

  return (
    <div className="container rounded-xl bg-gray-300 pb-4 pt-4">
      <div className="grid grid-flow-col gap-3">
        <h1 className="break-all pb-4 pt-2 text-3xl font-bold uppercase">
          {selectedMember.name} bérének kiszámítása
        </h1>

        <DeleteMemberButton />
      </div>

      <div className="grid gap-y-8">
        <div className="grid max-w-sm gap-y-4">
          <InputWithLabel
            type={"text"}
            id={"first-name"}
            placeholder={"Név"}
            labelText={"Családtag neve"}
            autoComplete={"given-name"}
            value={selectedMember.name}
            onInput={(event) => {
              const inputValue = event.target.value;

              if (inputValue.length > 70) return;

              dispatch(
                setSelectedMember({
                  name: inputValue,
                }),
              );
            }}
          />

          <CurrencyInput
            type={"text"}
            id={"gross-salary"}
            labelText={"Bruttó bér"}
            placeholder={"250.000 Ft"}
            value={formattedGrossSalary}
            setCurrencyValue={setGrossSalary}
          />

          <SalarySlider setSalary={setGrossSalary} value={[grossSalary]} />

          <SalaryButtons salaryValue={grossSalary} setSalary={setGrossSalary} />
        </div>

        <div className="grid gap-y-3">
          <h2 className="font-semibold">KEDVEZMÉNYEK</h2>
          <DiscountSwitch
            id={"below-25"}
            labelText={"25 év alattiak SZJA kedvezménye"}
            value={isBelow25}
            setValue={setIsBelow25}
          />

          <JustMarried
            isEligible={isJustMarriedEligible}
            setIsEligible={setIsJustMarriedEligible}
          />

          <DiscountSwitch
            id={"personal-tax-deduction"}
            labelText={"Személyi adókedvezmény"}
            value={isPersonalTaxDeduction}
            setValue={setIsPersonalTaxDeduction}
          />

          <FamilyDiscount setValue={setFamilyDiscountValue} />
        </div>

        <div className="grid max-w-max gap-y-2 justify-self-center text-slate-700">
          <h2 className="text-xl font-semibold tracking-wide">
            Számított nettó bér:
          </h2>

          <OutputBadge value={netSalary} />
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
