
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import UserCard from "@/components/cards/UserCard";

const page = async () => {

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const results = await fetchUsers({
        userId: user.id,
        searchQuery: '',
        pageNumber: 1,
        pageSize: 25
    });


  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

        <div>
            {
                results.users.length === 0 ? (
                    <p className="no-result">No Users</p>
                ) : (
                    <>
                        {
                            results.users.map((person) => (
                                <UserCard
                                    key={person.id} 
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                    personType='User'
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    </section>
  )
}

export default page