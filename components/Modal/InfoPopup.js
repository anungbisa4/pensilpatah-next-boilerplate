import { Menu, Transition } from "@headlessui/react";

function InfoPopup() {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>

      {/* Use the Transition component. */}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items>
          <div>test</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
