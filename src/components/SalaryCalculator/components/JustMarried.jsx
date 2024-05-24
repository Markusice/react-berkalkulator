import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMember } from "../../../store/reducers/familyMembersSlice";
import DatePicker from "./DatePicker";
import DiscountSwitch from "./DiscountSwitch";
import EligibleBadge from "./EligibleBadge";

const JustMarried = ({ isEligible, setIsEligible }) => {
  const [isJustMarried, setIsJustMarried] = useState(false);
  const [date, setDate] = useState(null);
  const [isDateSaved, setIsDateSaved] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setSelectedMember({
        isJustMarried: isJustMarried,
        date: date && date.toISOString(),
        isDateSaved: isDateSaved,
      }),
    );
  }, [isJustMarried, isDateSaved]);

  const { selectedMember } = useSelector((state) => state.familyMembers);

  useEffect(() => {
    setIsJustMarried(selectedMember.isJustMarried);
    setDate(selectedMember.date && new Date(selectedMember.date));
    setIsDateSaved(selectedMember.isDateSaved);
  }, [selectedMember.id]);

  const checkIsMarriageValid = () => {
    if (!date) return;

    setIsDateSaved(true);

    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const marriageYear = date.getFullYear();

    const currentMonth = currentDate.getMonth();
    const marriageMonth = date.getMonth();

    if (currentYear - marriageYear > 2) setIsEligible(true);
    else if (currentYear - marriageYear === 2 && currentMonth > marriageMonth)
      setIsEligible(true);
    else setIsEligible(false);
  };

  return (
    <div className="flex h-10 gap-x-3">
      <DiscountSwitch
        id={"just-married"}
        labelText={"Friss házasok kedvezménye"}
        value={isJustMarried}
        setValue={setIsJustMarried}
      />
      {isJustMarried && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {date ? "Dátum módosítása" : "Dátum hozzáadása"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogDescription>
                A kedvezmény először a házasságkötést követő hónapra vehető
                igénybe és a házassági életközösség alatt legfeljebb 24 hónapon
                keresztül jár.
              </DialogDescription>
            </DialogHeader>
            <DatePicker
              text={"Add meg a házasságkötés dátumát"}
              date={date}
              setDate={setDate}
            />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={checkIsMarriageValid}
                >
                  Mentés
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <EligibleBadge
        isShowing={isJustMarried && isDateSaved}
        isEligible={isEligible}
      />
    </div>
  );
};

export default JustMarried;
