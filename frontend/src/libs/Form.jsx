export const FormSwitch = ({id}) => (
    <div class="inline-flex items-center">
        <div class="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input id={id} type="checkbox"
                class="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer checked:bg-indigo-700 peer-checked:border-indigo-700 peer-checked:before:bg-indigo-700"
                 />
            <label htmlFor={id}
                class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-black dark:bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-indigo-700 peer-checked:before:bg-indigo-700">
                <div class="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
            </label>
        </div>
    </div>
)