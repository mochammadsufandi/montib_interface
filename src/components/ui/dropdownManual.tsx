import { useRouter } from "next/router"
import { useState } from "react";

export const Dropdown = () => {

    const router = useRouter();
    const [service, setService] = useState("");
    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setService(value);

        if(value !== "Select Option") {
            router.push("/service");
        }
    }

    return (
        <div className="flex flex-col space-y-1 ml-[1.5rem] pb-[1.5rem]">
            <label htmlFor="service" className="font-medium text-[20px]">Service</label>
            <select 
                id="service"
                name="service"
                value={service}
                onChange={handleChange}
                className="w-64 px-[1rem] py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option>Select Option</option>
                <option>Broadcast</option>
                <option>Aeronautical</option>
                <option>Fixed Service</option>
                <option>Land Mobile (Pr)</option>
                <option>Land Mobile (Pu)</option>
                <option>Maritime</option>
                <option>Satellite</option>
                <option>Other Service</option>
            </select>
        </div>
    )
}