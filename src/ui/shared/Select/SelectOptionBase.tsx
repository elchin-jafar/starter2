import { ListboxOption } from "@headlessui/react";
import type { SelectDataType } from "./select.type";

const SelectOptionBase = <T extends SelectDataType>({ data }: { data: T }) => {
    return (
        <ListboxOption
            className="
    relative cursor-pointer select-none p-2 rounded
    text-gray-900 data-[focus]:bg-gray-100 data-[selected]:bg-blue-50
    dark:text-white/85
    dark:data-[focus]:bg-white/10
    dark:data-[selected]:bg-teal-500/15
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
  "
            disabled={data.disabled}
            value={data}
        >
            {data.name}
        </ListboxOption>
    );
};

export default SelectOptionBase;
