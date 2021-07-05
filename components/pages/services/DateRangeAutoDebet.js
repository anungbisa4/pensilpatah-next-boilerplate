import { useState } from "react"
import InputDate from "@/components/Form/InputDate";

export default function DateRangeAutoDebet() {
  const [startDate, setStartDate] = useState("-")
  const [endDate, setEndDate] = useState("-")
  return (
    <>
      <InputDate
        label="Start Date Auto Debet"
        value={startDate}
        onSelect={setStartDate}
      />
      <InputDate
        label="End Date Auto Debet"
        value={endDate}
        onSelect={setEndDate}
      />
    </>
  );
}