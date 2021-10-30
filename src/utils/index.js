export const toastObj = (title,status) => {
    return {
      title: title,
      status: status,
      duration: 3000,
      position: "top",
      isClosable: true,
    };
  };