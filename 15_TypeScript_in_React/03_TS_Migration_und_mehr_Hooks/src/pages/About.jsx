const About = () => {
  return (
    <div className='space-y-10'>
      <section className='text-center'>
        <h1 className='text-4xl font-bold mb-4 text-primary'>About Us</h1>
        <p className='text-lg max-w-2xl mx-auto'>
          Welcome to <span className='font-semibold text-primary'>Travel Agency</span> — your
          gateway to unforgettable experiences! We specialize in affordable, student-friendly travel
          packages tailored for Software Engineering students.
        </p>
      </section>
      <section className='grid md:grid-cols-2 gap-4 place-items-center'>
        <div>
          <h2 className='text-2xl font-semibold mb-2 text-primary'>Why Travel With Us?</h2>
          <ul className='list-disc list-inside space-y-2 text-base'>
            <li>Affordable, curated student trips</li>
            <li>Group packages to tech hubs & hackathons</li>
            <li>Safe, reliable, and fun experiences</li>
            <li>Led by students, for students</li>
          </ul>
        </div>
        <img
          src='https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='Students traveling on a bus'
          className='rounded-box shadow-md'
        />
      </section>
      <section className='bg-base-200 p-6 rounded-box'>
        <h2 className='text-2xl font-semibold mb-4 text-primary'>Our Mission</h2>
        <p>
          To connect SE students through shared travel adventures, fostering learning, friendships,
          and unforgettable memories — all while staying budget-friendly.
        </p>
      </section>
    </div>
  );
};

export default About;
