#! /bin/sh

# chmod +x test.sh # make the script file executable

# echo "what's your name?"
# read PERSON
# echo "hello, $PERSON"

# After a variable is marked read-only, its value cannot be changed.
START=$(date +%s.%2N)
NAME='Zara'
readonly NAME

# we cannot use the unset command to unset variables that are marked readonly.
# unset NAME // ERRORRR 
unset PERSON
echo $PERSON
echo $NAME

echo "PID,Process ID: $$" #PID , process ID
echo "File Name: $0" #the filename of the current script.
echo "First Parameter : $1"
echo "Second Parameter : $2"
echo "Total Number of Parameters : $#" #the number of arguments supplied to a script
echo "Quoted Values: $*" #all the arguments are double quoted. If a script receives two arguments, $* is equivalent to $1 $2.
echo "Quoted Values: $@" #all the arguments are individually double quoted. If a script receives two arguments, $@ is equivalent to $1 $2
echo "Exit Status: $?" #The exit status of the last command executed. 0 if they were successful, and 1 if they were unsuccessful
echo $! #The process number of the last background command.


## ARRAYS

# NAMES[0]="Zara"
# NAMES[1]="Qadir"
# NAMES[2]="Mahnaz"
# NAMES[3]="Ayan"
# NAMES[4]="Daisy"
# echo "First Index: ${NAMES[*]}" # access all the items in an array OR ${NAMES[@]}
# echo "Second Index: ${NAMES[1]}"

##Operators
# a=10
# b=20

echo "Addition : `expr $a + $b`"
echo "Subtraction : `expr $a - $b`"
echo "Multiplication : `expr $a \* $b`"
echo "Division : `expr $b / $a`"
echo "Modulus : `expr $b % $a`"
echo "Assignment : a = $b "
echo "Equality : `[ $a == $b ]` "
echo "Not Equality : `[ $a != $b ]` "

# Relational Operators
# -eq=> equal -ne=>not equal -gt=>greater than -lt=>less than -ge=>greater than or equal -le=>less than or equal

# Boolean Operators
# !=>inverts boolean -o=>OR -a=>AND



# String Operators
# -z => checks if the string size is zero; if it is zero length returns true,
# -n => checks if the given string size is non-zero; if it is nonzero length returns true,
# str => Checks if str is not the empty string; if it is empty returns false

# File Test Operators => check it out


# conditional statements which are used to perform different actions based on different conditions.
# The if...else statement
# The case...esac statement


# number_one () {
#    echo "This is the first function speaking..."
#    number_two
# }

# number_two () {
#    echo "This is now the second function speaking..."
# }

# # Calling function one.
# number_one

a=20
b=20

## if...fi
# if [ $a == $b ]
# then
#    echo "a is equal to b"
# fi


## if...else...fi
# if [ $a == $b ]
# then
#    echo "a is equal to b"
# else
#    echo "a is not equal to b"
# fi

## if...elif...fi
# if [ $a == $b ]
# then
#    echo "a is equal to b"
# elif [ $a -gt $b ]
# then
#    echo "a is greater than b"
# else
#    echo "a is less than b"
# fi

# The case...esac, switch-case
# option="${1}" 
# case ${option} in 
#    -f) FILE="${2}" 
#       echo "File name is $FILE"
#       ;; 
#    -d) DIR="${2}" 
#       echo "Dir name is $DIR"
#       ;; 
#    *)  
#       echo "`basename ${0}`:usage: [-f file] | [-d directory]" 
#       exit 1 # Command to come out of the program with status 1
#       ;; 
# esac
END=$(date +%s.%2N)
runtime=$(bc)
echo "*-COMPILEBOX::ENDOFOUTPUT-*" $runtime 
