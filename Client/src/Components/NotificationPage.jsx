import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

export default function NotificationPage({ userId, role }) {
  const [notifications, setNotifications] = useState([]);
  const { lastMessage, sendJsonMessage, readyState } = useWebSocket(
    "ws://localhost:3000"
  );

  // Authenticate user when socket opens
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ type: "AUTH", userId, role });
      console.log(`${role} ${userId} registered`);
    }
  }, [readyState, sendJsonMessage, userId, role]);

  // Handle incoming notifications
  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);

      if (data.type === "INIT_NOTIFICATIONS") {
        setNotifications(
          data.notifications.map((notif) => ({
            message: notif.message,
            time: new Date(notif.createdAt).toLocaleTimeString(),
          }))
        );
      }

      if (data.type === "NOTIFICATION") {
        setNotifications((prev) => [
          ...prev,
          { message: data.message, time: data.time },
        ]);
      }
    }
  }, [lastMessage]);

  return (
    <Box p={6} fontFamily="Arial" maxW="600px" mx="auto">
      <Box display="flex" alignItems="center" mb={4}>
        <BellIcon w={6} h={6} mr={2} />
        <Text fontSize="2xl" fontWeight="bold">
          {role.charAt(0).toUpperCase() + role.slice(1)} {userId} Notifications
        </Text>
        {notifications.length > 0 && (
          <Badge ml={3} colorScheme="red">
            {notifications.length}
          </Badge>
        )}
      </Box>

      <Text mb={4}>
        Status:{" "}
        <Text as="span" fontWeight="bold">
          {readyState === ReadyState.OPEN ? "Connected" : "Disconnected"}
        </Text>
      </Text>

      <TableContainer maxH="300px" overflowY="auto" border="1px solid #ccc">
        <Table variant="striped" size="sm">
          <Thead position="sticky" top={0} bg="gray.100">
            <Tr>
              <Th>Time</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notifications.map((notif, index) => (
              <Tr key={index}>
                <Td>{notif.time}</Td>
                <Td>{notif.message}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
