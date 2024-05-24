import HouseHoldTable from "./components/HouseHoldTable";

const HouseholdSummary = () => {
  return (
    <div className="flex flex-col items-center gap-y-6 rounded-xl bg-gray-300 p-4 pt-16">
      <h2 className="text-2xl font-bold">Háztartás összesített jövedelme</h2>

      <HouseHoldTable />
    </div>
  );
};

export default HouseholdSummary;
