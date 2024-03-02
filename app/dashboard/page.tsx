import {auth} from '@clerk/nextjs'
import DropzoneComponent from '@/components/Dropzone';
import {db} from '../../firebase'
import {getDocs, collection} from 'firebase/firestore'
import { FileType } from '@/typings';
import TableWrapper from '@/components/tables/TableWrapper';
const Dashboard = async () => {

  const { userId } =  auth(); 

  const docsResults = await getDocs(collection(db, "users", userId!, "files"))
  const skeletonFiles: FileType[] = docsResults.docs.map(doc => ({
    id: doc.id,
    filename: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullname: doc.data().fullName,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  // console.log(skeletonFiles)

  return (  
    <div className='border-t'>
      <DropzoneComponent /> 

      <section className='container space-y-5'>
        <h2 className='text-center font-bold'>Your files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard;