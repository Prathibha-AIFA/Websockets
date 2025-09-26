import React from "react";
import { Box, Button, Heading, VStack, HStack, Divider } from "@chakra-ui/react";
import { notifyUser } from "../services/api";

export default function LandingPage() {
  const handleClick = async (role, userId) => {
    try {
      await notifyUser(role, userId, `Hello ${role} ${userId}!`);
      console.log(`Notification sent to ${role} ${userId}`);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const clients = [1, 2, 3];
  const hrs = [1, 2];
  const managers = [1, 2];
  const admins = [1, 2];

  return (
    <Box p={6} fontFamily="Arial">
      <Heading mb={6}>Landing Page</Heading>

      <VStack align="start" spacing={6}>
        {/* Clients Section */}
        <Box>
          <Heading size="md" mb={2}>Clients</Heading>
          <HStack spacing={3}>
            {clients.map((id) => (
              <Button key={`client-${id}`} colorScheme="blue" onClick={() => handleClick("client", id)}>
                Notify Client {id}
              </Button>
            ))}
          </HStack>
        </Box>

        <Divider />

        {/* HR Section */}
        <Box>
          <Heading size="md" mb={2}>HRs</Heading>
          <HStack spacing={3}>
            {hrs.map((id) => (
              <Button key={`hr-${id}`} colorScheme="green" onClick={() => handleClick("hr", id)}>
                Notify HR {id}
              </Button>
            ))}
          </HStack>
        </Box>

        <Divider />

        {/* Managers Section */}
        <Box>
          <Heading size="md" mb={2}>Managers</Heading>
          <HStack spacing={3}>
            {managers.map((id) => (
              <Button key={`manager-${id}`} colorScheme="orange" onClick={() => handleClick("manager", id)}>
                Notify Manager {id}
              </Button>
            ))}
          </HStack>
        </Box>

        <Divider />

        {/* Admins Section */}
        <Box>
          <Heading size="md" mb={2}>Admins</Heading>
          <HStack spacing={3}>
            {admins.map((id) => (
              <Button key={`admin-${id}`} colorScheme="red" onClick={() => handleClick("admin", id)}>
                Notify Admin {id}
              </Button>
            ))}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
