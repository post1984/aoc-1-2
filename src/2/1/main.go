package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type movement struct {
	direction string
	distance  int
}

func main() {
	fileIn := OpenFile("prompts/2_1/input.txt")
	defer fileIn.Close()
	scannerIn := bufio.NewScanner(fileIn)
	fmt.Println("res:", Driver(scannerIn))
}

func OpenFile(str string) *os.File {
	file, err := os.Open(str)
	if err != nil {
		log.Fatal(err)
	}
	return file
}

func Driver(scanner *bufio.Scanner) int {
	vertical := 0
	horizontal := 0
	for scanner.Scan() {
		move := extractMovement(scanner.Text())
		if move.direction == "forward" {
			horizontal += move.distance
		} else if move.direction == "up" {
			vertical -= move.distance
		} else {
			vertical += move.distance
		}
	}
	return vertical * horizontal
}

func extractMovement(line string) movement {
	lineSplit := strings.Split(line, " ")
	num, err := strconv.Atoi(lineSplit[1])
	if err != nil {
		log.Fatal(err)
	}
	word := strings.ToLower(lineSplit[0])

	return movement{direction: word, distance: num}
}
