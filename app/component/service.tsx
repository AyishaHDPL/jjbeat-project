export const methodPostWithoutPost = async ({ data, url }: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};



// export const methodPostWithoutPost = async ({ data, url }: any) => {
//   console.log(data, 'dataaa')
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const response = await fetch(`${API_URL}${url}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// };


export const methofGetWithoutParameter = async ({ url }: { url: string }) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API Error"); 
  }
  return await response.json(); 
};



// export const methodPost = async ({ data, url, token }: any) => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }), 
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };
