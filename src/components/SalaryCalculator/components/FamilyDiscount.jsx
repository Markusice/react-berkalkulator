import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMember } from "../../../store/reducers/familyMembersSlice";
import DiscountSwitch from "./DiscountSwitch";

const FamilyDiscount = ({ setValue }) => {
  const [isFamilyDiscount, setIsFamilyDiscount] = useState(false);
  const [numberOfSustained, setNumberOfSustained] = useState(0);
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setSelectedMember({
        isFamilyDiscount: isFamilyDiscount,
        numberOfSustained: numberOfSustained,
        numberOfBeneficiaries: numberOfBeneficiaries,
      }),
    );
  }, [isFamilyDiscount, numberOfSustained, numberOfBeneficiaries]);

  useEffect(() => {
    let familyDiscountValue;

    switch (numberOfBeneficiaries) {
      case 0:
        familyDiscountValue = 0;
        break;
      case 1:
        familyDiscountValue = 10_000 * numberOfSustained;
        break;
      case 2:
        familyDiscountValue = 20_000 * numberOfSustained;
        break;
      default:
        familyDiscountValue = 33_000 * numberOfSustained;
        break;
    }

    setValue(familyDiscountValue);
  }, [numberOfSustained, numberOfBeneficiaries]);

  const { selectedMember } = useSelector((state) => state.familyMembers);

  useEffect(() => {
    setIsFamilyDiscount(selectedMember.isFamilyDiscount);
    setNumberOfSustained(selectedMember.numberOfSustained);
    setNumberOfBeneficiaries(selectedMember.numberOfBeneficiaries);
  }, [selectedMember.id]);

  return (
    <div className="grid gap-y-2">
      <DiscountSwitch
        id={"family-discount"}
        labelText={"Családi kedvezmény"}
        value={isFamilyDiscount}
        setValue={setIsFamilyDiscount}
      />
      {isFamilyDiscount && (
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-3xl"
            onClick={() => {
              setNumberOfSustained(numberOfSustained + 1);
            }}
          >
            +
          </Button>
          <span>{numberOfSustained}</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-3xl"
            onClick={() => {
              if (numberOfSustained === 0) return;

              if (numberOfSustained === numberOfBeneficiaries) {
                setNumberOfBeneficiaries(numberOfBeneficiaries - 1);
              }

              setNumberOfSustained(numberOfSustained - 1);
            }}
          >
            -
          </Button>
          <span>Eltartott, ebből kedvezményezett:</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-3xl"
            onClick={() => {
              const maxNumberOfBeneficiaries = 3;

              if (
                numberOfBeneficiaries === numberOfSustained ||
                numberOfBeneficiaries === maxNumberOfBeneficiaries
              )
                return;

              setNumberOfBeneficiaries(numberOfBeneficiaries + 1);
            }}
          >
            +
          </Button>
          <span>{numberOfBeneficiaries}</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-3xl"
            onClick={() => {
              if (numberOfBeneficiaries === 0) return;

              setNumberOfBeneficiaries(numberOfBeneficiaries - 1);
            }}
          >
            -
          </Button>
        </div>
      )}
    </div>
  );
};

export default FamilyDiscount;
