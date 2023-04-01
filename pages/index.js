import { useState, useEffect } from "react";
import { Flex, Input, Button, Text, Image } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Dropdown, Loading } from "@nextui-org/react";
import axios from "axios";

const Structure = dynamic(
  () => {
    return import("../components/ngl");
  },
  { ssr: false }
);

const Label = ({ title, data }) => {
  return (
    <Flex
      maxW={"300px"}
      paddingTop={"2px"}
      paddingBottom={"2px"}
      paddingRight={"12px"}
      paddingLeft={"12px"}
      align={"center"}
      justify={"center"}
      bg={"#E0FCD1"}
      border={"1px solid #3F7A1C"}
      rounded={"full"}
      fontSize={"14px"}
    >
      <Text color={"#326116"} fontSize={"16px"} fontWeight={"medium"}>
        {title}: {data}
      </Text>
    </Flex>
  );
};

export default function index() {
  const [route, setRoute] = useState(false);
  const [selected, setSelected] = useState(new Set(["Cartoon"]));
  const [display, setDisplay] = useState("cartoon");
  const [key, setKey] = useState(0);

  const dict = {
    Cartoon: "cartoon",
    "Ball n Stick": "ball+stick",
    "Ribbon n Line": "ribbon and line",
    Spacefill: "spacefill",
    Surface: "surface",
  };

  useEffect(() => {
    const val = selected.values().next().value;
    setDisplay(dict[val]);
    setKey(key + 1);
  }, [selected]);

  const [input, setInput] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [titl, setTitl] = useState("");
  const [pdb, setPdb] = useState("");
  const [molc, setMolc] = useState("");
  const [org, setOrg] = useState("");
  const [maininfo, setMaininfo] = useState("");
  const [fetchd, setFetchd] = useState(false);
  let title;
  let molecule;
  let organism;
  let inf;
  let flag = false;

  const getPdbData = async (id) => {
    const url = `https://files.rcsb.org/download/${id}.pdb`;
    const response = await fetch(url);
    const text = await response.text();
    molecule = text.split("MOLECULE:")[1].split(";")[0];
    organism = text.split("ORGANISM_SCIENTIFIC:")[1].split(";")[0];
    title = text.split("TITLE")[1].split("\n")[0].replace(/\s+/, "");
    flag = true;
  };

  const info = async (title, mol) => {
    if (flag) {
      try {
        const response = await axios.post(
          "/api/info",
          {
            title,
            mol,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { output } = response.data;
        inf = output.text;
        flag = false;
      } catch (error) {
        console.error(error);
      }
    }
  };

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  const main = async () => {
    setTrigger(true);
    const check = input.replace(/\s+/, "");
    if (check.length == 4) {
      setFetchd(false);
      const id = input.slice(0, 4);
      await getPdbData(id);
      setPdb(id);
      await info(title, molecule);
      setMaininfo(inf);
      setTitl(capitalizeWords(title));
      setMolc(capitalizeWords(molecule));
      setOrg(capitalizeWords(organism));
      setFetchd(true);
    }
  };

  return (
    <>
      <Flex
        display={!route ? "flex" : "none"}
        minH={"100vh"}
        flexDir={"column"}
        bg={"#F1FCEB"}
        align={"center"}
        justify={"center"}
      >
        <Flex flexDir={"column"} gap={"49px"}>
          <Flex flexDir={"column"} gap={"24px"} align={"center"}>
            <Image
              src={"logo.svg"}
              alt={"logo"}
              userSelect={"none"}
              draggable={"false"}
              h={"97px"}
              w={"386px"}
            />
            <Text
              fontSize={"24px"}
              fontWeight={"regular"}
              w={"496px"}
              lineHeight={"150%"}
              color={"#326116"}
            >
              a minimal small wiki to visualize proteins in 3d and briefly read
              about them from their pdb id.
            </Text>
          </Flex>
          <Flex
            w={"565px"}
            h={"74px"}
            bg={"white"}
            rounded={"full"}
            align={"center"}
            justifyContent={"space-between"}
          >
            <Input
              onChange={(e) => setInput(e.target.value)}
              marginLeft={"16px"}
              p={"0px"}
              w={"250px"}
              focusBorderColor={"transparent"}
              _active={{ border: "none" }}
              h={"22px"}
              fontSize={"19px"}
              border={"none"}
              fontWeight={"bold"}
              placeholder={" Search by PDB ID"}
              _placeholder={{ color: "rgba(50, 97, 22, 0.8)" }}
              color={"#326116"}
            />
            <Button
              onClick={async () => {
                setRoute(true);
                await main();
                await info(titl, molc);
                setMaininfo(inf);
              }}
              marginRight={"16px"}
              w={"132px"}
              h={"54px"}
              bg={"#66C72D"}
              fontSize={"19px"}
              fontWeight={"black"}
              rounded={"full"}
              color={"white"}
              _hover={{}}
              _active={{ bg: "#326116" }}
            >
              Search
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        display={route ? "flex" : "none"}
        minH={"100vh"}
        flexDir={"column"}
        bg={"#F1FCEB"}
        align={"center"}
      >
        <Flex
          mt={"46px"}
          w={"1280px"}
          justifyContent={"space-between"}
          align={"center"}
        >
          <Image
            src={"logo.svg"}
            alt={"logo"}
            userSelect={"none"}
            draggable={"false"}
            h={"54px"}
            w={"215px"}
          />
          <Flex
            w={"302px"}
            h={"54px"}
            bg={"white"}
            rounded={"full"}
            align={"center"}
            justifyContent={"space-between"}
          >
            <Input
              onChange={(e) => setInput(e.target.value)}
              marginLeft={"16px"}
              p={"0px"}
              w={"150px"}
              focusBorderColor={"transparent"}
              _active={{ border: "none" }}
              h={"22px"}
              fontSize={"16px"}
              border={"none"}
              fontWeight={"bold"}
              placeholder={" Search by PDB ID"}
              _placeholder={{ color: "rgba(50, 97, 22, 0.8)" }}
              color={"#326116"}
            />
            <Button
              onClick={async () => {
                await main();
                await info(titl, molc);
                setMaininfo(inf);
              }}
              marginRight={"16px"}
              w={"102px"}
              h={"38px"}
              bg={"#66C72D"}
              fontSize={"18px"}
              fontWeight={"black"}
              rounded={"full"}
              color={"white"}
              _hover={{}}
              _active={{ bg: "#326116" }}
            >
              Search
            </Button>
          </Flex>
        </Flex>

        {trigger ? (
          fetchd ? (
            <Flex
              w={"1280px"}
              justifyContent={"space-between"}
              mt={"80px"}
              mb={"40px"}
            >
              <Flex flexDir={"column"}>
                <Flex gap={"7px"} align={"baseline"} w={"556px"}>
                  <Text
                    color={"#326116"}
                    fontSize={"24px"}
                    lineHeight={"120%"}
                    fontWeight={"bold"}
                  >
                    {titl}
                  </Text>
                </Flex>
                <Flex mt={"32px"} gap={"8px"}>
                  <Label title={"Molecule"} data={molc} />
                  <Label title={"Organism"} data={org} />
                </Flex>

                <Flex mt={"40px"} w={"556px"}>
                  <Text
                    color={"#326116"}
                    fontSize={"16px"}
                    fontWeight={"medium"}
                    lineHeight={"150%"}
                  >
                    {maininfo}
                  </Text>
                </Flex>
              </Flex>

              <Flex gap={"40px"} align={"end"} flexDir={"column"}>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    css={{
                      height: "40px",
                      width: "146px",
                      background: "white",
                      color: "#326116",
                      borderRadius: "$3xl",
                      border: "1px solid  #3F7A1C",
                      fontSize: "16px",
                      fontWeight: "bold",
                      lineHeight: "150%",
                    }}
                  >
                    {selected}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    css={{ focusBorderColor: "", fontSize: "16px" }}
                    aria-label="Static Actions"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                  >
                    <Dropdown.Item key="Ball n Stick">
                      Ball n Stick
                    </Dropdown.Item>
                    <Dropdown.Item key="Cartoon">Cartoon</Dropdown.Item>
                    <Dropdown.Item key="Ribbon n Line">
                      Ribbon n Line
                    </Dropdown.Item>
                    <Dropdown.Item key="Spacefill">Spacefill</Dropdown.Item>
                    <Dropdown.Item key="Surface">Surface</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Structure key={key} pdbID={"1TIM"} persp={display} />
              </Flex>
            </Flex>
          ) : (
            <Flex h={"80vh"} justify={"center"} align={"center"}>
              <Loading css={{ $$loadingColor: "#326116" }} size={"lg"} />
            </Flex>
          )
        ) : (
          ""
        )}
      </Flex>
    </>
  );
}
