import { getOffices } from "./_data/office";
import { OfficesPresenter } from "./offices-presenter";

type OfficesContainerProps = {
  page: number;
};
export async function OfficesContainer({ page }: OfficesContainerProps) {
  const { totalPage, offices } = await getOffices(page);

  return (
    <OfficesPresenter offices={offices} totalPage={totalPage} page={page} />
  );
}
