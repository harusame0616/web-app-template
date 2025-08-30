import { AlertCircle, Calendar, User } from "lucide-react";
import React from "react";

import { Card, CardContent } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

type InfoItemSkeletonProps = {
  icon: React.ReactNode;
  label: string;
  fullWidth?: boolean;
  lines?: number;
};

function InfoItemSkeleton({
  icon,
  label,
  fullWidth = false,
  lines = 1,
}: InfoItemSkeletonProps) {
  return (
    <div className={`space-y-1 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-base font-medium pl-6 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className="h-5 w-full max-w-sm" />
        ))}
      </div>
    </div>
  );
}

export function CustomerDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="shadow-sm border-slate-200">
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItemSkeleton
                icon={<Calendar className="size-4" />}
                label="生年月日・年齢"
                lines={2}
              />
              <InfoItemSkeleton
                icon={<User className="size-4" />}
                label="性別"
              />
            </div>
            <div className="pt-4 border-t border-slate-200">
              <InfoItemSkeleton
                icon={<AlertCircle className="size-4" />}
                label="アレルギー"
                fullWidth
                lines={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
