package cmd

import (
	"context"
	"time"

	"github.com/smacker/superset-compose/cmd/sandbox-ce/compose"
)

type installCmd struct {
	Command `name:"install" short-description:"Install"`
}

func (c *installCmd) Execute(args []string) error {
	if err := compose.Run(context.Background(),
		"run", "--rm", "superset", "./docker-init.sh"); err != nil {
		return err
	}

	done := OpenUI(10 * time.Second)

	if err := compose.Run(context.Background(), "up"); err != nil {
		return err
	}

	if err := <-done; err != nil {
		return err
	}

	return nil
}

func init() {
	rootCmd.AddCommand(&installCmd{})
}
