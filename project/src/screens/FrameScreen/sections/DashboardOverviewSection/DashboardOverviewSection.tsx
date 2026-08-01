import { Card, CardContent } from "../../../../components/ui/card";

const overviewCards = [
  {
    value: "2,564",
    label: "Total Students",
    trend: "12 Added Today",
    trendClassName: "text-[#277909]",
    trendIcon: "/trend-icon-3.svg",
    icon: "/total-employees-icon.svg",
    iconAlt: "Total employees icon",
  },
  {
    value: "1,923",
    label: "Active Internships",
    trend: "15 New",
    trendClassName: "text-[#277909]",
    trendIcon: "/trend-icon.svg",
    icon: "/currently-ongoing-icon.svg",
    iconAlt: "Currently ongoing",
  },
  {
    value: "641",
    label: "Completed Internships",
    trend: "2 Completed",
    trendClassName: "text-unsuccessfull",
    trendIcon: "/trend-icon-1.svg",
    icon: "/absent-icon.svg",
    iconAlt: "Absent icon",
  },
  {
    value: "86",
    label: "Companies",
    trend: "4 New Arrives",
    trendClassName: "text-success",
    trendIcon: "/trend-icon.svg",
    icon: "/late-arrivals-icon.svg",
    iconAlt: "Late arrivals icon",
  },
  {
    value: "173",
    label: "Pending Reports",
    trend: "2 Completed",
    trendClassName: "text-unsuccessfull",
    trendIcon: "/trend-icon-1.svg",
    icon: "/absent-icon.svg",
    iconAlt: "Absent icon",
  },
  {
    value: "94",
    label: "Pending Reviews",
    trend: "2 less than yesterday",
    trendClassName: "text-primary-color",
    trendIcon: "/trend-icon.svg",
    icon: "/time-off-icon.svg",
    iconAlt: "Time off icon",
  },
];

export const DashboardOverviewSection = (): JSX.Element => {
  return (
    <section
      aria-label="Dashboard overview"
      className="grid min-h-[330px] w-full grid-cols-1 gap-[18px] self-stretch lg:h-[330px] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <Card className="overflow-hidden rounded-[9px] border-[0.9px] border-[#00000033] bg-white shadow-none">
        <CardContent className="grid h-full grid-cols-[minmax(0,1fr)_120px] items-center gap-[9px] px-[21.6px] py-9">
          <div className="flex h-full flex-col items-start justify-between">
            <div className="flex flex-col items-start gap-[14.4px]">
              <p className="[font-family:'SF_Pro-Regular',Helvetica] text-[14.4px] font-normal leading-[normal] tracking-[0] text-black">
                System Status:
              </p>
              <div className="flex items-center gap-[10.8px]">
                <p className="[font-family:'SF_Pro-Regular',Helvetica] whitespace-nowrap text-[43.2px] font-normal leading-[normal] tracking-[0] text-black">
                  Active
                </p>
                <span
                  aria-label="System active"
                  className="h-[18px] w-[18px] rounded-full bg-[#01ab06]"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-[14.4px]">
              <p className="[font-family:'SF_Pro-Medium',Helvetica] text-[28.8px] font-medium leading-[normal] tracking-[0] text-primary-text">
                09:06:26 <span className="text-[14.4px]">A.M.</span>
              </p>
              <time
                dateTime="2026-07-06"
                className="[font-family:'SF_Pro-Medium',Helvetica] whitespace-nowrap text-[14.4px] font-medium leading-[normal] tracking-[0] text-secondary-text"
              >
                06 July 2026
              </time>
            </div>
            <div className="flex flex-col items-start gap-[18px]">
              <p className="[font-family:'SF_Pro-Medium',Helvetica] text-[21.6px] font-medium leading-[normal] tracking-[0] text-black">
                Users:
              </p>
              <p className="[font-family:'SF_Pro-Regular',Helvetica] whitespace-nowrap text-[14.4px] font-normal leading-[normal] tracking-[0] text-black">
                25 sessions active
              </p>
            </div>
          </div>
          <img
            className="h-[150px] w-[120px] object-cover"
            alt="Image"
            src="/image-5.png"
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {overviewCards.map((card) => (
          <article key={card.label} className="min-w-0">
            <Card className="h-full min-h-[156.15px] overflow-hidden rounded-[9px] border-[0.9px] border-[#00000033] bg-white shadow-none">
              <CardContent className="flex h-full items-start justify-between px-[20.7px] py-[26.1px]">
                <div className="flex min-w-0 flex-1 flex-col items-start gap-[7.2px]">
                  <div className="flex flex-col items-start gap-[28.8px]">
                    <p className="[font-family:'SF_Pro-Bold',Helvetica] whitespace-nowrap text-[28.8px] font-bold leading-[normal] tracking-[0] text-black">
                      {card.value}
                    </p>
                    <p className="[font-family:'SF_Pro-Semibold',Helvetica] whitespace-nowrap text-[14.4px] font-normal leading-[normal] tracking-[0] text-primary-text">
                      {card.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-[7.2px]">
                    <img
                      className="h-[18px] w-[18px]"
                      alt="Trend icon"
                      src={card.trendIcon}
                    />
                    <p
                      className={`${card.trendClassName} [font-family:'SF_Pro-Medium',Helvetica] whitespace-nowrap text-[12.6px] font-medium leading-[normal] tracking-[0]`}
                    >
                      {card.trend}
                    </p>
                  </div>
                </div>
                <img className="shrink-0" alt={card.iconAlt} src={card.icon} />
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
};
