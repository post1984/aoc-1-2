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
	fileIn := OpenFile("prompts/2_2/input.txt")
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
	depth := 0
	aim := 0
	horizontal := 0
	for scanner.Scan() {
		move := extractMovement(scanner.Text())
		if move.direction == "forward" {
			horizontal += move.distance
			depth += aim * move.distance
		} else if move.direction == "up" {
			aim -= move.distance
		} else {
			aim += move.distance
		}
	}
	return depth * horizontal
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
