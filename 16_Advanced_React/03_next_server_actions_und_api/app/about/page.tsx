import LikesBtn from './LikesBtn';

export default function AboutPage() {
  return (
    <div className='flex flex-col gap-4'>
      <title>About | Demo</title>

      <h1 className='text-2xl font-bold font-display'>About us</h1>
      <p className='max-w-prose'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fuga ut facere beatae cum est quae non eligendi
        accusantium sapiente reprehenderit incidunt voluptate cumque asperiores voluptatibus dolores nihil, minus
        voluptas magni in debitis fugit, quidem distinctio veniam. Fugiat quia pariatur nemo animi ullam quasi, placeat
        sapiente architecto consectetur ab harum consequatur beatae soluta est quo molestiae repellat dolores. Unde,
        itaque, sint officia neque quae possimus aliquam provident dolor a autem tempora perspiciatis dolore, vel iste
        aspernatur voluptatum saepe porro quod est voluptates magni! Voluptates, quod? Officiis nesciunt ipsa repellat
        reprehenderit ab eligendi laboriosam est omnis quis modi. Doloremque modi amet nisi alias enim quidem dolor
        corrupti assumenda suscipit voluptates voluptatum tenetur, beatae totam similique expedita ratione veritatis
        optio delectus maiores quae. Perspiciatis, voluptates.
      </p>
      <LikesBtn />
    </div>
  );
}
