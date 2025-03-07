import { Button } from "@/components/ui/button";

const RoleSelection=({ setRole }) =>{
  const roles = ["Developer", "Data Analyst", "HR", "Tester", "Manager", "Designer"];

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Select Your Role</h1>
      <div className="grid grid-cols-3 gap-4">
        {roles.map((r) => (
          <Button key={r} onClick={() => setRole(r)} className="p-3 bg-blue-500 hover:bg-blue-600">
            {r}
          </Button>
        ))}
      </div>
    </div>
  );
}
export default RoleSelection;
