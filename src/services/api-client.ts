import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats",
});

interface RetreatsType {
  id: string;
  title: string;
  image: string;
  description: string;
  date: number;
  location: string;
  price: number;
  type?: string;
}

class APIClient {
  getAllRetreats = async (): Promise<RetreatsType[]> => {
    try {
      const res = await axiosInstance.get<RetreatsType[]>(`/`);
      return res.data;
    } catch (error) {
      console.error("Error fetching all retreats", error);
      throw error;
    }
  };

  getRetreat = async (id: string): Promise<RetreatsType> => {
    try {
      const res = await axiosInstance.get<RetreatsType>(`/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching retreat with id ${id}`, error);
      throw error;
    }
  };
}

export default APIClient;
export type { RetreatsType };
