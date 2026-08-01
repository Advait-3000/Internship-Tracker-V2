import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";

const periods = ["Daily", "Weekly", "Monthly"];
const reportValues = ["100", "80", "60", "40", "20", "0"];
const days = [
  "Monday",
  "Tuesday",
  "wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const legendItems = [
  { label: "Computer", color: "#8979ff" },
  { label: "IT", color: "#ff928a" },
  { label: "EXTC", color: "#3bc3de" },
];

const radialLabels = [
  { value: "50", className: "top-[5.61%] left-[63.05%] w-[5.24%]" },
  { value: "100", className: "top-[24.49%] left-[79.2%] w-[7.86%]" },
  { value: "200", className: "top-[69.9%] left-[80.07%] w-[7.86%]" },
  { value: "250", className: "top-[89.8%] left-[61.74%] w-[7.86%]" },
  { value: "350", className: "top-[89.8%] left-[21.39%] w-[7.86%]" },
  { value: "400", className: "top-[69.9%] left-[5.67%] w-[7.86%]" },
  { value: "300", className: "top-[94.9%] left-[41.22%] w-[7.86%]" },
  { value: "450", className: "top-[47.45%] left-0 w-[7.86%]" },
  { value: "500", className: "top-[24.49%] left-[4.37%] w-[7.86%]" },
  { value: "550", className: "top-[6.63%] left-[21.58%] w-[7.86%]" },
  { value: "150", className: "top-[47.45%] left-[84.44%] w-[7.86%]" },
  { value: "0", className: "top-0 left-[46.02%] w-[2.18%]" },
];

const ChartLegend = ({
  className = "",
}: {
  className?: string;
}): JSX.Element => (
  <div className={`flex items-center justify-center gap-[6.48px] ${className}`}>
    {legendItems.map((item) => (
      <div
        key={item.label}
        className="inline-flex items-center gap-[3.24px] p-[3.24px]"
      >
        <span
          className="relative block h-[12.96px] w-[12.96px]"
          aria-hidden="true"
        >
          <span
            className="absolute left-0 top-1/2 h-0.5 w-[13px] -translate-y-1/2"
            style={{ backgroundColor: item.color }}
          />
          <span
            className="absolute left-1/2 top-1/2 h-[6.48px] w-[6.48px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.81px] bg-white"
            style={{ borderColor: item.color }}
          />
        </span>
        <span className="[font-family:'Inter',Helvetica] text-[9.7px] font-normal leading-[normal] text-[#000000b2]">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

const ChartPeriodSelector = ({ name }: { name: string }): JSX.Element => {
  const [period, setPeriod] = useState("Daily");

  return (
    <RadioGroup
      aria-label={`${name} period`}
      value={period}
      onValueChange={setPeriod}
      className="flex items-center justify-end gap-[18.63px]"
    >
      {periods.map((item) => (
        <label
          key={item}
          htmlFor={`${name}-${item}`}
          className="flex cursor-pointer items-center gap-[6.48px] [font-family:'Inter',Helvetica] text-[9.7px] font-normal leading-[normal] text-black"
        >
          <span>{item}</span>
          <RadioGroupItem
            id={`${name}-${item}`}
            value={item}
            className="h-[12.15px] w-[12.15px] border-[0.81px] border-[#00000080] text-[#8979ff]"
          />
        </label>
      ))}
    </RadioGroup>
  );
};

export const InternshipAnalyticsSection = (): JSX.Element => {
  return (
    <section
      aria-label="Internship analytics"
      className="flex w-full flex-col items-stretch gap-[18px] lg:flex-row"
    >
      <Card className="min-w-0 flex-[1.27] rounded-[8.1px] border-[0.81px] border-[#0000001a] bg-white p-[12.96px] shadow-none">
        <CardContent className="flex min-h-[344px] flex-col gap-[12.96px] p-0">
          <header className="flex items-center gap-4">
            <h2 className="[font-family:'SF_Pro-Bold',Helvetica] whitespace-nowrap text-[19.4px] font-bold leading-[normal] text-black">
              Report Submission
            </h2>
            <div className="min-w-0 flex-1">
              <ChartPeriodSelector name="report-submission" />
            </div>
          </header>
          <div className="flex min-h-0 flex-1 flex-col bg-white px-[12.96px] pb-[12.96px] pt-[25.92px]">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex min-h-0 flex-1">
                <div className="flex shrink-0 flex-col justify-between px-[3.24px] [font-family:'Inter',Helvetica] text-[9.7px] font-normal leading-[normal] text-[#000000b2]">
                  {reportValues.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
                <div className="relative min-h-[175px] flex-1">
                  <div className="absolute inset-[1px] flex flex-col justify-between px-[0.81px] py-[4.86px]">
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={`horizontal-line-${index}`}
                        className="h-px w-full"
                        alt="Line"
                        src="/line-6.svg"
                      />
                    ))}
                    <img className="h-px w-full" alt="Line" src="/line-9.svg" />
                  </div>
                  <div className="absolute inset-[1px] flex justify-between px-[0.81px] py-[4.86px]">
                    {[...Array(8)].map((_, index) => (
                      <img
                        key={`vertical-line-${index}`}
                        className="h-full w-px"
                        alt="Line"
                        src="/line.svg"
                      />
                    ))}
                  </div>
                  <img
                    className="absolute left-px top-0 h-[calc(100%_-_11px)] w-full"
                    alt="Line area"
                    src="/linearea.svg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 pl-[23.49px] pb-[6.48px] pt-0 [font-family:'Inter',Helvetica] text-center text-[9.7px] font-normal leading-[normal] text-[#000000b2]">
                {days.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
            <ChartLegend className="mt-1 min-h-[15px] overflow-hidden" />
          </div>
        </CardContent>
      </Card>
      <Card className="min-w-0 flex-1 rounded-[8.1px] border-[0.81px] border-[#0000001a] bg-white p-[12.96px] shadow-none">
        <CardContent className="flex min-h-[344px] flex-col gap-[12.96px] p-0">
          <header className="flex items-center gap-4">
            <h2 className="[font-family:'SF_Pro-Bold',Helvetica] whitespace-nowrap text-[19.4px] font-bold leading-[normal] text-black">
              Internship Status
            </h2>
            <div className="min-w-0 flex-1">
              <ChartPeriodSelector name="internship-status" />
            </div>
          </header>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-8 lg:gap-[56px]">
            <div className="relative h-[266.45px] w-[311.42px] shrink-0">
              <img
                className="absolute left-[11.97%] top-[9.18%] h-[81.63%] w-[69.84%]"
                alt="Ellipse"
                src="/ellipse-10.svg"
              />
              <img
                className="absolute left-[38.16%] top-[39.8%] h-[20.41%] w-[17.46%]"
                alt="Ellipse"
                src="/ellipse-10.svg"
              />
              <img
                className="absolute left-[11.97%] top-[9.18%] h-[81.63%] w-[69.84%]"
                alt="Ellipse"
                src="/ellipse-9.svg"
              />
              {radialLabels.map((label) => (
                <span
                  key={`${label.value}-${label.className}`}
                  className={`absolute h-[5.1%] [font-family:'Mulish',Helvetica] text-right text-[7.8px] font-normal leading-[11.7px] text-black ${label.className}`}
                >
                  {label.value}
                </span>
              ))}

              <img
                className="absolute left-[33px] top-[23px] h-56 w-56"
                alt="Group"
                src="/group-39.png"
              />
            </div>
            <ChartLegend className="hidden flex-col items-start justify-start gap-[22px] lg:flex" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
