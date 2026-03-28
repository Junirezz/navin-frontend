import React from "react";

/** Dark dashboard shimmer (stats, tables on #131720 / #14171e backgrounds). */
export const skeletonDark = "rounded-md animate-shimmer";

/** Teal-tinted shimmer (payments, teal UI). */
export const skeletonTeal = "rounded animate-shimmer-teal";

/** Light cards (customer dashboard). */
export const skeletonLight = "rounded-lg bg-gray-200/90 animate-pulse";

type SkeletonBarProps = { className?: string; variant?: "dark" | "teal" | "light" };

export const SkeletonBar: React.FC<SkeletonBarProps> = ({
    className = "",
    variant = "dark",
}) => (
    <div
        className={
            variant === "light"
                ? `${skeletonLight} ${className}`
                : variant === "teal"
                  ? `${skeletonTeal} ${className}`
                  : `${skeletonDark} ${className}`
        }
        aria-hidden
    />
);

/** Matches company dashboard stat cards: label, value, trend. */
export const StatCardSkeleton: React.FC = () => (
    <div
        className="bg-[#14171e] border border-[#1e293b] rounded-xl p-6 flex flex-col gap-3 max-md:p-4"
        aria-hidden
    >
        <SkeletonBar className="h-3 w-24" />
        <SkeletonBar className="h-9 w-20 max-md:h-8" />
        <SkeletonBar className="h-3 w-16" />
    </div>
);

/** Desktop: table header + rows. Mobile: stacked cards. */
export const RecentShipmentsTableSkeleton: React.FC = () => (
    <div className="border border-[rgba(30,41,59,0.5)] rounded-xl overflow-hidden max-md:bg-transparent max-md:border-none">
        <table
            className="w-full border-collapse max-md:hidden"
            aria-hidden
        >
            <thead>
                <tr>
                    {["ID", "Destination", "Status"].map((h) => (
                        <th
                            key={h}
                            className="text-left px-6 py-4 border-b border-[rgba(30,41,59,0.5)] bg-[rgba(15,23,42,0.5)]"
                        >
                            <SkeletonBar className="h-3 w-16" />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="group">
                        <td className="px-6 py-4 border-b border-[rgba(30,41,59,0.5)] bg-[#131720]">
                            <SkeletonBar className="h-3.5 w-24" />
                        </td>
                        <td className="px-6 py-4 border-b border-[rgba(30,41,59,0.5)] bg-[#131720]">
                            <SkeletonBar className="h-3.5 w-36" />
                        </td>
                        <td className="px-6 py-4 border-b border-[rgba(30,41,59,0.5)] bg-[#131720]">
                            <SkeletonBar className="h-6 w-20" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="hidden max-md:flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center bg-[#131720] rounded-xl mb-2 border border-[rgba(30,41,59,0.5)] px-4 py-3.5 gap-3"
                >
                    <SkeletonBar className="h-10 w-10 min-w-[40px] rounded-[10px]" />
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                        <SkeletonBar className="h-4 w-28" />
                        <SkeletonBar className="h-3 w-full max-w-[200px]" />
                    </div>
                    <SkeletonBar className="h-9 w-9 rounded-full shrink-0" />
                </div>
            ))}
        </div>
    </div>
);

/** Customer active shipment card placeholder. */
export const ActiveShipmentCardSkeleton: React.FC = () => (
    <div
        className="bg-white border border-[#e5e7eb] rounded-lg p-6 flex flex-col gap-4"
        aria-hidden
    >
        <div className="flex justify-between items-center">
            <SkeletonBar variant="light" className="h-4 w-28" />
            <SkeletonBar variant="light" className="h-7 w-24 rounded-xl" />
        </div>
        <SkeletonBar variant="light" className="h-4 w-full max-w-[280px]" />
        <div className="flex flex-col gap-2">
            <SkeletonBar variant="light" className="h-3 w-24" />
            <SkeletonBar variant="light" className="h-4 w-36" />
        </div>
        <SkeletonBar variant="light" className="h-10 w-full rounded-md" />
    </div>
);

const umSk = "bg-[#334155] animate-pulse rounded";

/** Team management table body placeholder (dark table). */
export const UserManagementTableSkeleton: React.FC<{ rows?: number }> = ({
    rows = 8,
}) => (
    <tbody aria-label="Team table loading">
        {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
                <td>
                    <div className="user-info">
                        <div
                            className={`user-avatar ${umSk} !text-transparent border-none`}
                            aria-hidden
                        />
                        <div className="user-details gap-1.5">
                            <span className={`block h-4 w-32 ${umSk} mb-0`} />
                            <span className={`block h-3 w-44 ${umSk}`} />
                        </div>
                    </div>
                </td>
                <td>
                    <div className={`h-8 w-28 ${umSk}`} />
                </td>
                <td>
                    <div className={`h-6 w-16 ${umSk} rounded-full`} />
                </td>
                <td className="last-login">
                    <div className={`h-4 w-36 ${umSk}`} />
                </td>
                <td className="actions-col">
                    <div className={`h-8 w-8 ${umSk} ml-auto`} />
                </td>
            </tr>
        ))}
    </tbody>
);

/** Payment history table (teal theme, 5 columns). */
export const PaymentHistoryTableSkeleton: React.FC<{ rows?: number }> = ({
    rows = 10,
}) => (
    <div
        className="bg-[rgba(19,186,186,0.05)] border border-[rgba(98,255,255,0.2)] rounded-2xl overflow-hidden mb-5 shadow-[inset_0_0_20px_0px_rgba(0,128,128,0.3)] md:overflow-x-auto"
        aria-label="Payment history loading"
    >
        <table className="w-full border-collapse md:min-w-[800px]">
            <thead className="bg-[rgba(19,186,186,0.1)]">
                <tr>
                    {["Date", "Shipment ID", "Amount", "Status", "Transaction Hash"].map(
                        (h) => (
                            <th
                                key={h}
                                className="text-left px-6 py-4 text-[11px] font-semibold text-[#62ffff] uppercase border-b border-[rgba(98,255,255,0.2)]"
                            >
                                <SkeletonBar variant="teal" className="h-3 w-20" />
                            </th>
                        ),
                    )}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                    <tr key={i}>
                        {Array.from({ length: 5 }).map((__, j) => (
                            <td
                                key={j}
                                className="px-6 py-4 border-b border-[rgba(98,255,255,0.2)]"
                            >
                                <SkeletonBar variant="teal" className="h-4 w-full max-w-[120px]" />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

/** Notification feed card placeholder. */
export const NotificationCardSkeleton: React.FC = () => (
    <div
        className="border rounded-xl p-5 flex gap-4 bg-[#1f2937] border-[#374151]"
        aria-hidden
    >
        <SkeletonBar className="h-12 w-12 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
                <SkeletonBar className="h-5 w-48" />
                <SkeletonBar className="h-5 w-28" />
            </div>
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-3 w-24" />
        </div>
    </div>
);
