const chakraUI = jest.requireActual("@chakra-ui/react");

module.exports = {
  ...chakraUI,
  useMediaQuery: jest.fn().mockReturnValue(true),
  useBreakpoint: jest.fn().mockReturnValue(() => "pluto"),
  useBreakpointValue: jest.fn().mockReturnValue(() => "pippo"),
  useDisclosure: jest.fn().mockImplementation(() => ({
    isOpen: true,
    onClose: jest.fn(),
    onOpen: jest.fn(),
  })),
};
