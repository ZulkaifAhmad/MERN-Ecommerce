import React, { useActionState } from 'react'

function Subscribe() {
  const subscribeAction = async (prevState, formData) => {
    const email = formData.get("email");

    console.log("Subscribed email:", email);

    return { success: true, message: "Thanks for subscribing! 🎉" };
  };

  const [state, formAction, isPending] = useActionState(subscribeAction, {
    success: false,
    message: "",
  });

  return (
    <div className='text-center px-4 pb-20'>
      <p className='text-2xl font-bold text-gray-800'>Subscribe to our Email</p>
      <p className='text-gray-500 mt-2 max-w-md mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, corrupti.
      </p>

      <form
        action={formAction}
        className='flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 max-w-md mx-auto'
      >
        <input
          type="email"
          name="email"
          placeholder='Enter your email'
          required
          className='w-full sm:flex-1 border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-500 transition-colors'
        />
        <button
          type="submit"
          disabled={isPending}
          className='w-full font-sans sm:w-auto bg-black text-white text-sm px-6 py-2 cursor-pointer hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
        >
          {isPending ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {state.message && (
        <p className='mt-3 text-sm text-green-600'>{state.message}</p>
      )}
    </div>
  )
}

export default Subscribe