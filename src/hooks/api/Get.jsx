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





const useCategoryData = (url, limit = 0, filter = {}, currentPage = 0, update = false) => {
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

      // Only add page & limit if > 0
      if (currentPage > 0) queryParams.append("page", currentPage);
      if (limit > 0) queryParams.append("limit", limit);

      const queryString = queryParams.toString();
      const finalUrl = queryString ? `${url}?${queryString}` : url;

      const { data } = await axios.get(finalUrl);

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

export { useCategoryData };
