import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  useGetClientQuery,
  useDeleteClientMutation,
} from "../../../../state/apis/mealProgramApi/doorfrontApi";
import ClientInformation from "../../scan/ClientInformation";
import Loading from "../../../reusable/loading/Loading";
import PastMeals from "../../scan/PastMeals";
import DeleteModal from "../../DeleteModal";

const ClientDetail = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useGetClientQuery(id || "");

  const [deleteClient, { isLoading: deleteLoading }] =
    useDeleteClientMutation();

  const navigate = useNavigate();

  if (isLoading || deleteLoading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Client not found.</div>;
  }

  return (
    <div>
      <ClientInformation client={data.client} />
      <PastMeals meals={data.clientMeals} />
      <div className="doorfront-delete-container">
        <button className="cancel" onClick={() => setModalOpen(true)}>
          Delete Client
        </button>
        {modalOpen && (
          <DeleteModal
            onDelete={async () => {
              navigate(-1);
              await deleteClient(data.client.id).unwrap();
            }}
            onCancel={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDetail;
