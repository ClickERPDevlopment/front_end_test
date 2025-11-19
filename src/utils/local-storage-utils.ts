export const companyId = localStorage.getItem("companyId");
export const setCompanyId = (id: number) =>
  localStorage.setItem("companyId", id.toString());
