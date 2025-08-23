import { filtersData } from "@/services/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFilters = (user?: any) => {
  const [filterData, setFilterData] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getFiltersData();
    }
  }, [user]);

  const getFiltersData = async () => {
    try {
      const response = await filtersData();
      setFilterData(response.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load filters");
    }
  };

  return { filterData, getFiltersData };
};
