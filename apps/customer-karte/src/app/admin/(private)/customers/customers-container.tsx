import { getCustomers } from "./_data/data";
import { CustomersPresenter } from "./customers-presenter";
import { CustomersSearchCondition } from "./customers-search-condition";

type CustomersContainerProps = {
  condition: CustomersSearchCondition;
};

export async function CustomersContainer({
  condition,
}: CustomersContainerProps) {
  const { totalPage, customers } = await getCustomers(condition);

  return (
    <CustomersPresenter
      customers={customers}
      totalPage={totalPage}
      page={condition.page}
    />
  );
}
