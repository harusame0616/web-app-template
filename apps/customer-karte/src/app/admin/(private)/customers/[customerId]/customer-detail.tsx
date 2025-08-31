import { TZDate } from "@date-fns/tz";
import { differenceInYears, format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar, FileText, Mail, MapPin, Phone, User } from "lucide-react";
import React from "react";

import { Gender, prisma, Prisma } from "@workspace/database-customer-karte";
import { Card, CardContent } from "@workspace/ui/components/card";
import { notFound } from "next/navigation";

type CustomerDetail = Prisma.CustomerGetPayload<{
  select: {
    birthday: true;
    gender: true;
    addresses: true;
    emails: true;
    phones: true;
    remarks: true;
  };
}>;

export async function getCustomerDetail(
  customerId: string,
): Promise<CustomerDetail | null> {
  const customerDetail = await prisma.customer.findUnique({
    select: {
      birthday: true,
      gender: true,
      emails: true,
      phones: true,
      addresses: true,
      remarks: true,
    },
    where: { customerId },
  });

  if (!customerDetail) {
    return null;
  }

  return customerDetail;
}

type CustomerDetailContainerProps = {
  customerId: string;
};

export async function CustomerDetailContainer({
  customerId,
}: CustomerDetailContainerProps) {
  const customer = await getCustomerDetail(customerId);

  if (!customer) {
    notFound();
  }

  return <CustomerDetailPresenter customerDetail={customer} />;
}

type CustomerDetailPresenterProps = {
  customerDetail: CustomerDetail;
};
export function CustomerDetailPresenter({
  customerDetail: customer,
}: CustomerDetailPresenterProps) {
  const birthday = new TZDate(customer.birthday, "Asia/Tokyo");
  const today = new TZDate(new Date(), "Asia/Tokyo");
  const age = differenceInYears(today, birthday);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              icon={<Calendar className="size-4" />}
              label="生年月日・年齢"
              value={
                <div>
                  <div>
                    {format(birthday, "yyyy年MM月dd日", {
                      locale: ja,
                    })}
                    <span className="text-sm text-muted-foreground mt-1">
                      （{age}歳）
                    </span>
                  </div>
                </div>
              }
            />
            <InfoItem
              icon={<User className="size-4" />}
              label="性別"
              value={getGenderLabel(customer.gender)}
            />
          </div>

          {/* 連絡先情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              icon={<Mail className="size-4" />}
              label="メールアドレス"
              value={
                customer.emails?.length ? (
                  <div className="space-y-1">
                    {customer.emails.map((email, index) => (
                      <div key={index}>{email}</div>
                    ))}
                  </div>
                ) : null
              }
            />
            <InfoItem
              icon={<Phone className="size-4" />}
              label="電話番号"
              value={
                customer.phones?.length ? (
                  <div className="space-y-1">
                    {customer.phones.map((phone, index) => (
                      <div key={index}>{phone}</div>
                    ))}
                  </div>
                ) : null
              }
            />
          </div>

          {/* 住所 */}
          <InfoItem
            icon={<MapPin className="size-4" />}
            label="住所"
            value={
              customer.addresses?.length ? (
                <div className="space-y-1">
                  {customer.addresses.map((address, index) => (
                    <div key={index}>{address}</div>
                  ))}
                </div>
              ) : null
            }
            fullWidth
          />

          {/* 備考 */}
          <InfoItem
            icon={<FileText className="size-4" />}
            label="備考"
            value={
              customer.remarks ? (
                <div className="whitespace-pre-wrap">{customer.remarks}</div>
              ) : null
            }
            fullWidth
          />
        </div>
      </CardContent>
    </Card>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
};

function InfoItem({ icon, label, value, fullWidth = false }: InfoItemProps) {
  return (
    <div className={`space-y-1 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-base font-medium pl-6">
        {value || <span className="text-muted-foreground">-</span>}
      </div>
    </div>
  );
}

function getGenderLabel(gender: Gender): string {
  switch (gender) {
    case "Man":
      return "男性";
    case "Woman":
      return "女性";
    case "Other":
      return "その他";
    default:
      return "不明";
  }
}
