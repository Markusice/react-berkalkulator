import { useSelector, useStore } from "react-redux";
import StorageContext from "../contexts/StorageContext";
import useLocalStorage from "../local-storage/useLocalStorage";
import { selectFromState } from "../store/state/selectFromState";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
  const { members } = useSelector((state) => state.familyMembers);
  const store = useStore();

  store.subscribe(() => {
    if (!members.length) return;

    const state = store.getState();

    setStorageStateId(selectFromState.id(state));
    setStorageMembers(selectFromState.members(state));
    setStorageSelectedMembers(selectFromState.selectedMember(state));
  });

  const [storageStateId, setStorageStateId] = useLocalStorage("stateId");
  const [storageMembers, setStorageMembers] = useLocalStorage("members");
  const [storageSelectedMember, setStorageSelectedMembers] =
    useLocalStorage("selectedMember");

  return (
    <StorageContext.Provider
      value={{ storageStateId, storageMembers, storageSelectedMember }}
    >
      <div className="container grid gap-y-1">
        <header className="pt-2">
          <FamilyMemberTabs />
        </header>
        <main className="grid gap-4 md:grid-cols-2">
          <SalaryCalculator />
          <HouseholdSummary />
        </main>
      </div>
    </StorageContext.Provider>
  );
};

export default HouseholdSalaryCalculator;
