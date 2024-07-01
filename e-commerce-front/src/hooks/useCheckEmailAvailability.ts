import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
    const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>("idle");
    const [prevEmail, setPrevEmail] = useState<null | string>(null);

    const checkEmailAvailability = async (email: string) => {
        setPrevEmail(email);
        setEmailAvailabilityStatus("checking");
        try {
            const response = await axios.get(`/users?email=${email}`);
            if (!response.data.length) {
                setEmailAvailabilityStatus("available");
            } else {
                setEmailAvailabilityStatus("notAvailable");
            }
        } catch (error) {
            setEmailAvailabilityStatus("failed");
        }
    };

    const resetCheckEmailAvailability = async (email: string) => {
    setEmailAvailabilityStatus('idle')
    setPrevEmail(null)
    }

    return {
        emailAvailabilityStatus,
        prevEmail,
        checkEmailAvailability,
        resetCheckEmailAvailability
    };
};

export default useCheckEmailAvailability;
