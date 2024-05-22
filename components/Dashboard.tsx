"use client";

import { Button, Flex, Heading, Icon, Text, View } from "@aws-amplify/ui-react";

function Dashboard({
  signOut,
}: {
  signOut: (data?: AuthEventData | undefined) => void;
}) {
  return (
    <View color="#bdc3d2" backgroundColor="#000000" padding="1em 2em">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading level={3}>EchoDiary</Heading>
        <Flex gap="2em">
          <Button
            width="20px"
            backgroundColor="transparent"
            padding="0"
            border="none"
          >
            <Icon
              pathData="M490.667,234.667H277.333V21.333C277.333,9.551,267.782,0,256,0c-11.782,0-21.333,9.551-21.333,21.333v213.333H21.333   C9.551,234.667,0,244.218,0,256c0,11.782,9.551,21.333,21.333,21.333h213.333v213.333c0,11.782,9.551,21.333,21.333,21.333   c11.782,0,21.333-9.551,21.333-21.333V277.333h213.333c11.782,0,21.333-9.551,21.333-21.333   C512,244.218,502.449,234.667,490.667,234.667z"
              viewBox={{
                width: 512,
                height: 512,
              }}
              ariaLabel="Add"
              color="#bdc3d2"
            />
          </Button>
          <Button
            padding=".2em 1em"
            backgroundColor="transparent"
            onClick={signOut}
          >
            <Text fontSize="1.2rem" color="#bdc3d2">
              Logout
            </Text>
          </Button>
        </Flex>
      </Flex>
    </View>
  );
}

export default Dashboard;
