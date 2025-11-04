import { useState, useEffect } from "react";
import axios from "../../axios";
import { processError } from "../../lib/utils";

const useFetchData = (
  url,
  limit,
  filter = {},
  currentPage = 1,
  update = false
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      // Add filter params if available
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });
      const { data } = await axios.get(
        `${url}?${queryParams?.toString()}&page=${currentPage}&limit=${limit}`
      );
      setData(data?.data);
      setPagination(data?.pagination);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [JSON.stringify(filter), currentPage, update]);

  return { loading, data, pagination };
};

const useFetchById = (url, update = false) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const getDataById = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${url}`);
      setData(data?.data);
      setPagination(data?.pagination);
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById();
  }, [update]);

  return { loading, data, pagination };
};

export { useFetchData, useFetchById };
