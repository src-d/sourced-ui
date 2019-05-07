package cmd

import (
	"context"
	"time"

	"github.com/smacker/superset-compose/cmd/sandbox-ce/compose"
)

type startCmd struct {
	Command `name:"start" short-description:"Start"`
}

func (c *startCmd) Execute(args []string) error {
	done := OpenUI(10 * time.Second)

	if err := compose.Run(context.Background(), "start"); err != nil {
		return err
	}

	if err := <-done; err != nil {
		return err
	}

	return nil

}

func init() {
	rootCmd.AddCommand(&startCmd{})
}
