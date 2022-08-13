package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("prompts/1_1/input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	prev := 0
	numIncreasing := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		num, err := strconv.Atoi(scanner.Text())
		if err != nil {
			break
		}

		if prev != 0 && prev < num {
			numIncreasing++
		}
		prev = num
	}
	fmt.Println(numIncreasing)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

}
