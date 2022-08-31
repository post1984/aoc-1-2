package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	fileIn := OpenFile("prompts/1_2/input.txt")
	defer fileIn.Close()
	scannerIn := bufio.NewScanner(fileIn)
	fileOutStr, err := threeMeasureSlidingWindow(scannerIn)
	if err != nil {
		log.Fatal(err)
	}

	fileOut := OpenFile(fileOutStr)
	defer fileOut.Close()
	scannerOut := bufio.NewScanner(fileOut)
	increasingNum, err := countIncreasingNumber(scannerOut)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(increasingNum)
}

func OpenFile(str string) *os.File {
	file, err := os.Open(str)
	if err != nil {
		log.Fatal(err)
	}
	return file
}

func countIncreasingNumber(scanner *bufio.Scanner) (int, error) {
	numIncreasing := 0
	prev := 0
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

	return numIncreasing, scanner.Err()
}

func threeMeasureSlidingWindow(scannerIn *bufio.Scanner) (string, error) {
	fileName := "./prompts/1_2/three.txt"
	fOut, err := os.Create(fileName)
	if err != nil {
		return "", err
	}
	dataWriter := bufio.NewWriter(fOut)
	defer fOut.Close()

	threeMeasure := []int{}
	sum := 0
	for scannerIn.Scan() {
		num, err := strconv.Atoi(scannerIn.Text())
		if err != nil {
			break
		}

		if len(threeMeasure) < 3 {
			threeMeasure = append(threeMeasure, num)
			sum += num
		} else {
			fmt.Printf("threeMeasure: %v + %d, sum: %d\n", threeMeasure, num, sum)
			sum += num - threeMeasure[0]
			threeMeasure = append(threeMeasure[1:], num)
			_, err := dataWriter.WriteString(fmt.Sprintf("%d\n", sum))
			if err != nil {
				log.Fatal(err)
			}
		}
		dataWriter.Flush()
	}

	return fileName, scannerIn.Err()
}
