import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const login = async () => {
  const response = await axios.post("/api/auth/login", {
    email: "user@example.com",
    password: "pass",
  });
  return response.data;
};
const signup = async () => {
  const response = await axios.post("/api/auth/signup", {
    name: "user",
    email: "user@example.com",
    password: "pass",
  });
  return response.data;
};

const topic = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGE2ZjE4Yi1iNzVhLTQxZTMtYjI0Yi0wYzQyZjExYjc0NDUiLCJpYXQiOjE3NTY2NjAxMjUsImV4cCI6MTc1Njc0NjUyNX0.Ok5aKhzBt1YrOJ3lZlb_ZmbqdfY3w9Sa9bXmb94zi78";
  const response = await axios.get("/api/topic/today", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const vote = async () => {
  const topicId = 1;
  const userId = "0da6f18b-b75a-41e3-b24b-0c42f11b7445";
  const choice = "A";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGE2ZjE4Yi1iNzVhLTQxZTMtYjI0Yi0wYzQyZjExYjc0NDUiLCJpYXQiOjE3NTY2NjAxMjUsImV4cCI6MTc1Njc0NjUyNX0.Ok5aKhzBt1YrOJ3lZlb_ZmbqdfY3w9Sa9bXmb94zi78";
  const response = await axios.post(
    `/api/topic/${topicId}/vote`,
    {
      userId,
      choice,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

const result = async () => {
  const topicId = 1;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGE2ZjE4Yi1iNzVhLTQxZTMtYjI0Yi0wYzQyZjExYjc0NDUiLCJpYXQiOjE3NTY2NjAxMjUsImV4cCI6MTc1Njc0NjUyNX0.Ok5aKhzBt1YrOJ3lZlb_ZmbqdfY3w9Sa9bXmb94zi78";
  const response = await axios.get(`/api/topic/${topicId}/result`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const health = async () => {
  const response = await axios.get("/api");
  return response.data;
};

export const App = () => {
  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['health'],
  //   queryFn: health,
  //   staleTime: 0,
  // })

  const { data, isPending, mutate, error } = useMutation({
    mutationFn: result,
    retry: 1,
  });

  return (
    <div>
      <button onClick={() => mutate()}>Call API</button>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>API Response: {JSON.stringify(data)}</p>}
    </div>
  );
};
