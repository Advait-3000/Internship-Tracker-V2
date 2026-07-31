import { DashboardOverviewSection } from "./sections/DashboardOverviewSection/DashboardOverviewSection";
import { InternshipAnalyticsSection } from "./sections/InternshipAnalyticsSection/InternshipAnalyticsSection";
import { StudentReportsSection } from "./sections/StudentReportsSection/StudentReportsSection";

export const FrameScreen = (): JSX.Element => {
  return (
    <main className="relative flex w-full max-w-[1174px] flex-col items-end gap-4">
      <DashboardOverviewSection />
      <InternshipAnalyticsSection />
      <StudentReportsSection />
    </main>
  );
};
