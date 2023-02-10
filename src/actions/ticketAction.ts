import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import { ITicket, ITicketCreate } from "~/interfaces/Ticket";

export async function getTickets(
  projectName: string
): PromiseServer<ITicket[]> {
  const response = await api.get("/ticket", {
    params: {
      projectName,
    },
  });
  return response.data;
}
interface ITicketCreateSent {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string[];
  assigner: string;
  targetedVulnerability: string[];
  projectName: string;
}
export async function createTicket(
  ticket: ITicketCreateSent
): PromiseServer<ITicket> {
  const response = await api.post("/ticket", {
    data: ticket,
  });
  return response.data;
}
export async function getTicket(id: string): PromiseServer<ITicket> {
  const response = await api.get(`/ticket/${id}`);
  return response.data;
}
export async function markTicket(
  id: string,
  status: "open" | "closed"
): PromiseServer<ITicket> {
  const response = await api.patch(`/ticket/${id}`, {
    data: {
      status,
    },
  });
  return response.data;
}
