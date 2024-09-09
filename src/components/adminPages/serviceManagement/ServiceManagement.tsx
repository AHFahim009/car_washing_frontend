import { SVGProps, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceManagement.api";
import { JSX } from "react/jsx-runtime";
import { TableSkeletonRow } from "@/helpers/TableSkeletonRow";

export default function Component() {
  const { data: allServices, isLoading: IsAllServiceLoading } = useGetAllServicesQuery("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceId, setServiceId] = useState("");

  const handleAddService = () => {
    setShowAddModal(true);
  };

  const handleEditService = (id: string) => {
    setServiceId(id)
    setShowEditModal(true);
  };

  const handleDeleteService = (id: string) => {
    setShowDeleteModal(true);
    setServiceId(id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={handleAddService}>Add Service</Button>
      </div>
      <Card>
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead className="whitespace-nowrap">Description</TableHead>
              <TableHead className="whitespace-nowrap">Price</TableHead>
              <TableHead className="whitespace-nowrap">Duration</TableHead>
              <TableHead className="whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              IsAllServiceLoading ? <TableSkeletonRow /> :
                <>
                  {allServices &&
                    allServices.data.map((service) => (
                      <TableRow key={service._id}>
                        <TableCell className="whitespace-nowrap">{service.name}</TableCell>
                        <TableCell className="min-w-[200px] max-w-[200px] break-words">{service.description}</TableCell>
                        <TableCell>${service.price.toFixed(2)}</TableCell>
                        <TableCell>{service.duration}</TableCell>
                        {/* action cell */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleEditService(service._id)}
                            >
                              <FilePenIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleDeleteService(service._id)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
            }
          </TableBody>
        </Table>
      </Card>

      {/* add new services Dialog box */}
      {showAddModal && (
        <AddServiceModal
          setShowAddModal={setShowAddModal}
          showAddModal={showAddModal}
        />
      )}

      {/* edit services Dialog box */}
      {showEditModal && (
        <EditServiceModal
          serviceId={serviceId}
          setShowEditModal={setShowEditModal}
          showEditModal={showEditModal}
        />
      )}

      {/* delete Dialog box */}
      {showDeleteModal && (
        <DeleteServiceModal
          serviceId={serviceId}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}
    </div>
  );
}

function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
