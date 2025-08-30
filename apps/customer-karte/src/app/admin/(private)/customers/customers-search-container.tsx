import { getAllOffices } from "../offices/_data/office";
import { CustomersSearchCondition } from "./customers-search-condition";
import { CustomersSearchForm } from "./customers-search-form";

type CustomersSearchContainerProps = {
  condition: CustomersSearchCondition;
};

export async function CustomersSearchContainer({
  condition,
}: CustomersSearchContainerProps) {
  const offices = await getAllOffices();

  return <CustomersSearchForm condition={condition} offices={offices} />;
}
