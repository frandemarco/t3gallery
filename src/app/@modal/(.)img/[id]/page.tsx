 import { Modal } from './modal';
//import { getImage } from "~/server/queries";
import FullPageImageView from '~/components/full-image-page';

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber=Number(photoId);
  if(Number.isNaN(idAsNumber)) throw new Error("Invaild photo id");
  return (
  <Modal>
    <FullPageImageView id={idAsNumber} />
  </Modal>
  );
}