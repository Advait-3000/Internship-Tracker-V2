import { FileSearchIcon, ListIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

const students = [
  {
    id: "1258",
    name: "Aarav",
    role: "Director",
    department: "Creative",
    status: "Average",
    workHours: "2.5 h",
  },
  {
    id: "1321",
    name: "Sarah",
    role: "Manager",
    department: "HR",
    status: "Good",
    workHours: "8.5 h",
  },
  {
    id: "1255",
    name: "Michael",
    role: "Engineer",
    department: "IT",
    status: "Average",
    workHours: "3.5 h",
  },
  {
    id: "1158",
    name: "Priya",
    role: "Analyst",
    department: "Finance",
    status: "Bad",
    workHours: "1.5 h",
  },
  {
    id: "1089",
    name: "David",
    role: "Developer",
    department: "IT",
    status: "Good",
    workHours: "8.75 h",
  },
  {
    id: "1234",
    name: "Lisa",
    role: "Coordinator",
    department: "Marketing",
    status: "Average",
    workHours: "4 h",
  },
  {
    id: "1187",
    name: "Raj",
    role: "Technician",
    department: "Maintenance",
    status: "Good",
    workHours: "8.5 h",
  },
  {
    id: "1412",
    name: "Emma",
    role: "Designer",
    department: "Creative",
    status: "Average",
    workHours: "2.5 h",
  },
  {
    id: "1345",
    name: "Ahmed",
    role: "Supervisor",
    department: "Operations",
    status: "Bad",
    workHours: "2.25 h",
  },
  {
    id: "1278",
    name: "Jennifer",
    role: "Accountant",
    department: "Finance",
    status: "Good",
    workHours: "9.5 h",
  },
] as const;

const statuses = ["Average", "Good", "Bad"] as const;

const statusStyles = {
  Average: "border-transparent bg-[#ffedd4] text-[#c93400]",
  Good: "border-transparent bg-green-100 text-[#008235]",
  Bad: "border-[#0000001a] bg-[#ffe2e2] text-[#c10007]",
} as const;

export const StudentReportsSection = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    ...statuses,
  ]);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return students.filter((student) => {
      const matchesStatus = selectedStatuses.includes(student.status);
      const matchesSearch =
        !normalizedSearch ||
        Object.values(student).some((value) =>
          value.toLowerCase().includes(normalizedSearch),
        );

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, selectedStatuses]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((currentStatuses) =>
      currentStatuses.includes(status)
        ? currentStatuses.filter((currentStatus) => currentStatus !== status)
        : [...currentStatuses, status],
    );
  };

  return (
    <section
      className="flex w-full flex-col gap-[15px] font-sans"
      aria-labelledby="student-reports-title"
    >
      <header className="flex min-h-[38px] flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2
          id="student-reports-title"
          className="[font-family:'Instrument_Sans',Helvetica] text-[13px] font-semibold leading-[19.5px] text-black"
        >
          Students Reports
        </h2>
        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5">
          <Tabs defaultValue="recent">
            <TabsList className="h-6 gap-1 rounded-lg bg-transparent p-0">
              <TabsTrigger
                value="recent"
                className="[font-family:'Instrument_Sans',Helvetica] h-6 rounded-lg px-2.5 text-xs font-medium leading-4 text-black shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="[font-family:'Instrument_Sans',Helvetica] h-6 rounded-lg px-2.5 text-xs font-medium leading-4 text-black shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Starred
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 gap-1.5 rounded-lg border-[#0000001a] bg-white px-3 pr-4 font-medium-type-14 text-[length:var(--medium-type-14-font-size)] font-[number:var(--medium-type-14-font-weight)] tracking-[var(--medium-type-14-letter-spacing)] text-black shadow-[0px_4px_8px_#0000000a] hover:bg-white"
                >
                  <img
                    className="h-4 w-4"
                    alt=""
                    aria-hidden="true"
                    src="/filter-funnel-02.svg"
                  />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    onCheckedChange={() => toggleStatus(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <label className="flex h-[34px] w-[182px] items-center gap-1.5 rounded-lg border border-[#0000001a] bg-white px-3 pr-4 shadow-[0px_4px_8px_#0000000a]">
              <SearchIcon
                className="h-4 w-4 shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="sr-only">SearchIcon student reports</span>
              <Input
                type="search"
                defaultValue=""
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="SearchIcon..."
                className="h-auto min-w-0 border-0 bg-transparent p-0 font-body-small-regular text-[length:var(--body-small-regular-font-size)] font-[number:var(--body-small-regular-font-weight)] tracking-[var(--body-small-regular-letter-spacing)] text-black shadow-none placeholder:text-black focus-visible:ring-0"
              />
            </label>
            <ToggleGroup
              type="single"
              defaultValue="table"
              aria-label="Report view"
              className="h-9 rounded-lg border border-black/10 bg-black/10 p-0.5"
            >
              <ToggleGroupItem
                value="table"
                aria-label="Table view"
                className="h-7 w-9 rounded-md p-0 text-black data-[state=on]:bg-white"
              >
                <ListIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="report"
                aria-label="Report view"
                className="h-7 w-9 rounded-md p-0 text-black data-[state=on]:bg-white"
              >
                <FileSearchIcon className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </header>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[900px] table-fixed border-collapse">
          <TableHeader>
            <TableRow className="h-11 border-0 hover:bg-transparent">
              <TableHead className="w-[8%] px-4 py-3 [font-family:'Arimo',Helvetica] text-sm font-bold leading-5 text-[#495565]">
                ID
              </TableHead>
              <TableHead className="w-[10%] px-4 py-3 [font-family:'Arimo',Helvetica] text-sm font-bold leading-5 text-[#495565]">
                Name
              </TableHead>
              <TableHead className="w-[14%] px-4 py-3 [font-family:'Arimo',Helvetica] text-sm font-bold leading-5 text-[#495565]">
                Role
              </TableHead>
              <TableHead className="w-[15%] px-4 py-3 [font-family:'Arimo',Helvetica] text-sm font-bold leading-5 text-[#495565]">
                Department
              </TableHead>
              <TableHead className="w-[14%] px-4 py-3 [font-family:'Arimo',Helvetica] text-sm font-bold leading-5 text-[#495565]">
                Status
              </TableHead>
              <TableHead className="w-[15%] px-4 py-3 [font-family:'Arimo',Helvetica] text-sm font-bold leading-5 text-[#495565]">
                Work Hours
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                className="h-[49px] border-0 hover:bg-transparent"
              >
                <TableCell className="[font-family:'Arimo',Helvetica] px-4 py-0 text-sm font-normal leading-5 text-neutral-950">
                  {student.id}
                </TableCell>
                <TableCell className="[font-family:'Arimo',Helvetica] px-4 py-0 text-sm font-normal leading-5 text-neutral-950">
                  {student.name}
                </TableCell>
                <TableCell className="[font-family:'Arimo',Helvetica] px-4 py-0 text-sm font-normal leading-5 text-neutral-950">
                  {student.role}
                </TableCell>
                <TableCell className="[font-family:'Arimo',Helvetica] px-4 py-0 text-sm font-normal leading-5 text-neutral-950">
                  {student.department}
                </TableCell>
                <TableCell className="px-4 py-0">
                  <Badge
                    className={`flex h-[22px] w-20 items-center justify-center rounded-lg border px-2 py-0.5 [font-family:'Arimo',Helvetica] text-xs font-normal leading-4 ${statusStyles[student.status]}`}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="[font-family:'Arimo',Helvetica] px-4 py-0 text-sm font-normal leading-5 text-neutral-950">
                  {student.workHours}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
