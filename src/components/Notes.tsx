import { useState } from "react";
import { ChevronDown } from "react-feather";
import useNotes from "../hooks/useNotes";

type NotesProps = {
    onStatus?: (message: string) => void;
};

export default function Notes({ onStatus }: NotesProps) {
    const [show, setShow] = useState<boolean>(false);
    const { notes, setNotes } = useNotes(onStatus);

    const handleShow = () => {
        setShow(!show);
    };

    return (
        <div className="flex flex-col gap-0">
            <button className={`min-h-10 min-w-261 flex flex-row justify-between px-10 items-center border border-monopro-950 text-md`} onClick={handleShow}>
                <p>Notes</p>
                <ChevronDown/>
            </button>
            <textarea
                spellCheck="false"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className={`${show ? "" : "hidden"} min-h-50 min-w-261 overflow-y-scroll overflow-x-hidden border-b border-l border-r border-monopro-950 bg-monopro-100 text-sm p-2`}
            />
        </div>
    );
}