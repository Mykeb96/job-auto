import "./FilterTool.css"

type RoleFilter = "full-time" | "contractor" | "both";

type Props = {
  roleFilter: RoleFilter;
  onRoleFilterChange: (next: RoleFilter) => void;
  postedMaxHours: number | null;
  onPostedMaxHoursChange: (next: number | null) => void;
};

export default function FilterTool({
  roleFilter,
  onRoleFilterChange,
  postedMaxHours,
  onPostedMaxHoursChange,
}: Props) {
  return (
    <div className="FilterTool_Container">
      <h2>Filters</h2>

      <div className="FilterTool_Schedule">
        <h3>Schedule</h3>
        <div className="schedule_radios">
          <label>
            <input
              type="radio"
              name="role"
              value="full-time"
              checked={roleFilter === "full-time"}
              onChange={() => onRoleFilterChange("full-time")}
            />
            Full-time
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="contractor"
              checked={roleFilter === "contractor"}
              onChange={() => onRoleFilterChange("contractor")}
            />
            Contractor
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="both"
              checked={roleFilter === "both"}
              onChange={() => onRoleFilterChange("both")}
            />
            Both
          </label>
        </div>
      </div>

      <div className="FilterTool_DatePosted">
        <h3>Date posted</h3>
        <label className="FilterTool_SelectLabel">
          <select
            className="FilterTool_Select"
            value={postedMaxHours ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              onPostedMaxHoursChange(raw === "" ? null : Number(raw));
            }}
          >
            <option value="">Any time</option>
            <option value="24">Less than 1 day ago</option>
            <option value="168">Less than 7 days ago</option>
            <option value="336">Less than 14 days ago</option>
            <option value="720">Less than 30 days ago</option>
          </select>
        </label>
      </div>
    </div>
  );
}