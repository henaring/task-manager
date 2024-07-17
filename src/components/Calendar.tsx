import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import React from "react";
export function Calendar() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const start = moment().startOf("month");
  const end = moment().endOf("month");
  const days: Date[] = [];
  for (let i = start; i <= end; i.add(1, "day")) {
    days.push(i.toDate());
  }
  const initialIndex = days.findIndex((day) =>
    moment(day).isSame(new Date(), "day")
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, count, current]);

  return (
    <div className="">
      <Carousel
        opts={{
          startIndex: initialIndex >= 0 ? initialIndex - 3 : 0,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: days.length }).map((_, index) => (
            <CarouselItem key={index} className="basis-[3.5rem]">
              <Card
                className={`${
                  index === initialIndex ? "bg-muted" : "bg-primary"
                } border-none shadow-none`}
              >
                <CardContent className="p-2">
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className={`${
                        index === initialIndex ? "text-primary" : "text-muted"
                      } text-xs text-center`}
                    >
                      {moment(days[index]).format("ddd")}
                    </span>
                    <span
                      className={`${
                        index === initialIndex ? "text-primary" : "text-muted"
                      } text-md font-semibold text-center`}
                    >
                      {moment(days[index]).format("D")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-indigo-600 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-indigo-600 to-transparent" /> */}
    </div>
  );
}
