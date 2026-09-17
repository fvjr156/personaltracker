import { useEffect, useState } from "react";
import { formalFormatTimestamp } from "../utils/dateUtils";

type AppFooterProps = {
    statusShow: boolean;
    statusMessage: string;
};

export default function AppFooter({ statusShow, statusMessage }: AppFooterProps) {
    const [timestamp, setTimestamp] = useState<string>(formalFormatTimestamp(new Date().toISOString()));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimestamp(formalFormatTimestamp(new Date().toISOString()));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="mt-auto border-t border-monopro-200 bg-monopro-50 px-6 py-3 dark:border-monopro-600">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <p className={`${statusShow ? "" : "hidden"} text-sm tracking-wide text-monopro-950 tabular-nums`}>
                        {statusMessage}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-sm tracking-wide text-monopro-950 tabular-nums">
                        {timestamp}
                    </p>
                </div>
            </div>
        </footer>
    );
}